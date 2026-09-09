import bcrypt from "bcryptjs";

export async function verifyPassword(
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    return {
      ok: false,
      error: "Server belum dikonfigurasi (ADMIN_PASSWORD_HASH kosong).",
    };
  }
  const valid = await bcrypt.compare(password, hash);
  return valid ? { ok: true } : { ok: false, error: "Password salah." };
}
