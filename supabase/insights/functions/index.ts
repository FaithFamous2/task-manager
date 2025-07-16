import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
serve(async (req)=>{
  const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  const { data: { user } } = await supabase.auth.getUser(req.headers.get("Authorization").split(" ")[1]);
  if (!user) {
    return new Response(JSON.stringify({
      error: "Unauthorized"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const { data: tasks, error } = await supabase.from("tasks").select("status").eq("user_id", user.id);
  if (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const insights = {
    total: tasks.length,
    pending: tasks.filter((t)=>t.status === "pending").length,
    inProgress: tasks.filter((t)=>t.status === "in-progress").length,
    done: tasks.filter((t)=>t.status === "done").length,
    completionRate: tasks.length ? Math.round(tasks.filter((t)=>t.status === "done").length / tasks.length * 100) : 0
  };
  return new Response(JSON.stringify(insights), {
    headers: {
      "Content-Type": "application/json"
    }
  });
});
