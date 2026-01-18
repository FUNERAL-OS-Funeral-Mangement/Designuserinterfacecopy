import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const { name, slug, full_name } = await req.json();

  if (!name || !slug) {
    return NextResponse.json({ error: "Missing name or slug" }, { status: 400 });
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const { data: userRes, error: userErr } = await supabase.auth.getUser();

  if (userErr || !userRes.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = userRes.user;

  // 1) Create funeral home
  const { data: fh, error: fhErr } = await supabaseAdmin
    .from("funeral_homes")
    .insert({ name, slug })
    .select("id")
    .single();

  if (fhErr) {
    return NextResponse.json({ error: fhErr.message }, { status: 400 });
  }

  // 2) Create owner profile
  const { error: profErr } = await supabaseAdmin.from("profiles").insert({
    id: user.id,
    funeral_home_id: fh.id,
    role: "owner",
    full_name: full_name ?? null,
    email: user.email ?? null,
  });

  if (profErr) {
    return NextResponse.json({ error: profErr.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, funeral_home_id: fh.id });
}
