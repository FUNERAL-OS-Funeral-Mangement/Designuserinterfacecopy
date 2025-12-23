# 🧪 First Call to eFax Testing Guide

## Quick Testing Steps

### Step 1: Complete First Call Intake ✅
1. Click **"First Call"** from dashboard
2. Fill in basic information:
   - Caller name: `Mary Foster`
   - Caller relationship: `Daughter`
   - Caller phone: `(555) 123-4567`
   - Deceased name: `John Smith`
   - Date/Time of death
   - Location: `North Shore Hospital`
   - Address: `1234 Main St`
   - Next of kin: `Mary Foster`
   - Next of kin phone: `(555) 123-4567`

3. **Removal Logistics:**
   - Weight: Select **"Known"** → Enter `180`
   - **Ready for pickup: Select "Yes"** ⚡
   - Ready time: `30 minutes`
   - **Select removal team: Choose any option** (e.g., Premier Removal Services)
   - Stairs: `No`
   - Family present: `Yes`

4. **Documents:**
   - Body Release Form is already checked (required)
   - Optionally check "Cremation Authorization" for 2 documents

5. Click **"Generate & Send for Signature"** button

---

### Step 2: Simulate Signatures ⏰
You should now see the **"Waiting on Signatures"** screen with:
- Progress: `0 / 1` (or `0 / 2` if you selected 2 documents)
- Amber waiting card explaining signatures sent to Mary Foster

**To advance to eFax:**
- Click **"Simulate Signature Received (Demo)"** button
- Click it again if you selected 2 documents
- Watch the progress bar fill: 0/1 → 1/1 ✓

**When all signatures complete:**
- System automatically advances to **Faxing stage** 🎉

---

### Step 3: Send eFaxes 📠

You should now see the **"Send Required Faxes"** screen with:
- Progress: `0 / 1` (or matches your document count)
- Blue "Ready to fax" card
- Current document showing: "Body Release Form" with green checkmark

**To send fax:**
1. Select a recipient (radio button):
   - ☑️ County Coroner - (555) 123-4567
   - ⚪ Medical Examiner - (555) 234-5678
   - ⚪ State Vital Records - (555) 345-6789

2. Click **"Send Fax to County Coroner"** button

3. Document moves to "Sent" section with green border
4. Progress updates: `1 / 1` ✓

**Repeat for each document:**
- If you had 2 documents, send both by selecting recipient + clicking Send
- Watch progress bar: 1/2 → 2/2

**When all faxes complete:**
- System automatically advances to **Complete stage** 🎉

---

## 🎯 Key Points to Test

### ✅ Removal Team Integration
- Only appears when "Ready for pickup" = **Yes**
- Shows notification checkbox
- Shows dropdown with 4 removal companies

### ✅ Document Count
- **1 document** = 1 signature + 1 fax
- **2 documents** = 2 signatures + 2 faxes
- Progress bars update correctly

### ✅ Auto-Advancement
- Intake → Signatures (after clicking "Generate & Send")
- Signatures → Faxing (after all signatures simulated)
- Faxing → Complete (after all faxes sent)

### ✅ Timeline Breadcrumbs
- Top of screen shows: Intake ✓ → Signatures ⏰ → Faxing → Complete
- Green checkmarks appear as stages complete
- Active stage highlighted in blue

---

## 🐛 Troubleshooting

### "I can't get to eFax stage"
- Make sure you clicked "Simulate Signature Received" for **each** document
- Check progress bar: Should say "X / X" where both numbers match
- System auto-advances when numbers match

### "Nothing happens when I click Send Fax"
- Make sure you selected a recipient (radio button)
- Button is disabled until recipient selected
- Each fax must be sent individually

### "I don't see the removal team section"
- Must select "Ready for pickup" = **Yes**
- Section only appears after selecting Yes
- Check if it's collapsed or scrolled out of view

---

## 📊 Expected Flow

```
┌─────────────────────────────────────────────┐
│ INTAKE                                       │
│ Fill form → Select removal team → Generate  │
│ ✓ Complete                                   │
├─────────────────────────────────────────────┤
│ SIGNATURES                                   │
│ Wait for family → Simulate signature(s)     │
│ ✓ Auto-advances when 1/1 or 2/2             │
├─────────────────────────────────────────────┤
│ EFAX                                         │
│ Select recipient → Send fax → Repeat        │
│ ✓ Auto-advances when all sent               │
├─────────────────────────────────────────────┤
│ COMPLETE ✅                                  │
└─────────────────────────────────────────────┘
```

Happy Testing! 🚀
