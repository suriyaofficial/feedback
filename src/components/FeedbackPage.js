import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
function FeedbackPage() {
  const { payload } = useParams();
  console.log("payload", payload);

function decodePayload(payload) {
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const pad =
      normalized.length % 4 === 2
        ? "=="
        : normalized.length % 4 === 3
        ? "="
        : "";
    const b64 = normalized + pad;
    const text = atob(decodeURIComponent(b64));
    return JSON.parse(text);
  } catch (error) {
    console.error("Error decoding payload:", error);
    return null;
  }}
const decoded =decodePayload(payload)
console.log("decoded",decoded);

const { data, isLoading, error } = useQuery({
    queryKey: ["business", decoded?.businessId],
    queryFn: async () => {
      if (!decoded?.businessId) return decoded; // fallback to decoded data
      // Replace this with your API endpoint
      const res = await fetch(`/api/business/${decoded.businessId}`);
      if (!res.ok) throw new Error("Failed to fetch business details");
      return res.json();
    },
    enabled: !!decoded, // ✅ only run query if decoded is not null
  });
  

  


  return (
    <><h1>pageeeeeeeeee</h1></>
  );
}

export default FeedbackPage;
