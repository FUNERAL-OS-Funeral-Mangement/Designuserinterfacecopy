import { useState, useRef } from 'react';
import { Camera, Check, Loader2, Pencil } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LogoUploadProps {
  currentLogo: string;
  funeralHomeName: string;
  onLogoUpdate?: (newLogoUrl: string) => void;
  onNameUpdate?: (newName: string) => void;
  userId?: string;
  orgId?: string; // Clerk organization ID (tenant key)
}

export function LogoUpload({
  currentLogo,
  funeralHomeName,
  onLogoUpdate,
  onNameUpdate,
  userId = 'demo-user',
  orgId,
}: LogoUploadProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(funeralHomeName);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase immediately
    await uploadLogo(file);
  };

  const uploadLogo = async (file: File) => {
    setIsUploading(true);

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === '') {
        console.warn('⚠️ Supabase not configured. Logo upload disabled.');
        alert('Logo upload is not configured yet. Please set up Supabase to enable this feature.');
        setPreviewUrl(null);
        setIsUploading(false);
        return;
      }

      // Validate orgId is present (required for multi-tenant)
      if (!orgId) {
        console.error('❌ No orgId provided - cannot upload logo');
        alert('Organization ID is missing. Please ensure you are logged in to an organization.');
        setPreviewUrl(null);
        setIsUploading(false);
        return;
      }

      // Use org-scoped path: logos/<org_id>/logo.png
      const fileExt = file.name.split('.').pop();
      const filePath = `logos/${orgId}/logo.${fileExt}`;

      // Upload to Supabase Storage (will overwrite existing logo)
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true, // Replace existing logo if it exists
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload logo. Please try again.');
        setPreviewUrl(null);
        return;
      }

      // Store the file path in the database
      // RLS will ensure this row is scoped to the current org
      const { error: dbError } = await supabase
        .from('funeral_homes')
        .upsert({
          org_id: orgId, // Tenant key
          logo_path: filePath,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'org_id'
        });

      if (dbError) {
        console.error('Database update error:', dbError);
        // Continue anyway - logo is uploaded even if DB update fails
      }

      // Show success
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);

      // Keep the preview URL in local state for immediate display
      if (onLogoUpdate) {
        onLogoUpdate(previewUrl || '');
      }

      console.log('✅ Logo uploaded successfully to:', filePath);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload logo. Please try again.');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNameSave = async () => {
    setIsEditingName(false);
    
    // Update in database if Supabase is configured
    const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl !== '' && orgId) {
      try {
        const { error } = await supabase
          .from('funeral_homes')
          .upsert({
            org_id: orgId, // Use org_id as tenant key
            name: editedName,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'org_id'
          });

        if (error) {
          console.error('Name update error:', error);
        }
      } catch (error) {
        console.error('Name update error:', error);
      }
    }

    // Callback to parent
    if (onNameUpdate) {
      onNameUpdate(editedName);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      setEditedName(funeralHomeName);
      setIsEditingName(false);
    }
  };

  const displayLogo = previewUrl || currentLogo;

  return (
    <div className="relative z-10">
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Container */}
        <div className="w-40 h-40 mx-auto flex items-center justify-center rounded-full overflow-hidden bg-gray-100 border border-gray-300 p-4 transition-all duration-200 relative">
          <img
            src={displayLogo}
            alt={editedName}
            className="w-full h-full object-contain relative z-10"
          />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-200 pointer-events-none ${
              isHovered || isUploading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                <span className="text-white text-xs">Uploading...</span>
              </>
            ) : uploadSuccess ? (
              <>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs">Uploaded!</span>
              </>
            ) : (
              <>
                <Camera className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-xs">Change Logo</span>
              </>
            )}
          </div>
        </div>

        {/* Click Target */}
        {!isUploading && (
          <button
            onClick={handleClick}
            className="absolute inset-0 z-30 cursor-pointer focus:outline-none rounded-full"
            aria-label="Upload logo"
            tabIndex={-1}
          />
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* Upload Instructions */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Click to upload a new logo
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG up to 2MB
        </p>
      </div>
    </div>
  );
}