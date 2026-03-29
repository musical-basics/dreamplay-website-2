"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createABTest(formData: FormData) {
    try {
        const supabase = await createAdminClient();

        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const targetPath = formData.get("target_path") as string;
        const variantName = formData.get("variant_name") as string; // e.g. "Variant B"
        const variantPath = formData.get("variant_path") as string; // e.g. "/how-it-works-b"

        // 1. Create the Test Container
        const { data: testData, error: testError } = await supabase
            .from("ab_tests")
            .insert({ name, slug, target_path: targetPath, status: 'active' })
            .select()
            .single();

        if (testError) throw new Error(testError.message);

        // 2. Create "Control" Variant (Default)
        const { error: controlError } = await supabase.from("ab_variants").insert({
            test_id: testData.id,
            name: "Control",
            path_rewrite: targetPath, // Control just rewrites to itself
            traffic_percent: 50,
        });

        if (controlError) throw new Error(controlError.message);

        // 3. Create "Variant B"
        const { error: variantError } = await supabase.from("ab_variants").insert({
            test_id: testData.id,
            name: variantName,
            path_rewrite: variantPath,
            traffic_percent: 50,
        });

        if (variantError) throw new Error(variantError.message);

        revalidatePath("/admin/ab-tests");
    } catch (e) {
        throw e;
    }

    // Redirect must be outside try/catch because uses an internal error for redirecting
    redirect("/admin/ab-tests");
}

export async function toggleTestStatus(testId: string, currentStatus: string) {
    try {
        const supabase = await createAdminClient();
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';

        const { error } = await supabase
            .from("ab_tests")
            .update({ status: newStatus })
            .eq("id", testId);

        if (error) throw error;

        revalidatePath("/admin/ab-tests");
    } catch (e) {
        console.error("[toggleTestStatus] ACTION ERROR:", e);
        throw e;
    }
}

export async function setWinner(testId: string, variantId: string | null) {
    try {
        const supabase = await createAdminClient();
        const { error } = await supabase
            .from("ab_tests")
            .update({ winning_variant_id: variantId, status: 'completed' })
            .eq("id", testId);

        if (error) throw error;

        revalidatePath("/admin/ab-tests");
    } catch (e) {
        console.error("[setWinner] ACTION ERROR:", e);
        throw e;
    }
}
