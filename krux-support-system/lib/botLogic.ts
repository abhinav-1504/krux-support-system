interface User {
  // ...
}

export async function handleBotResponse(query: string, user: User) {
  if (query.toLowerCase().includes("loan application")) {
    return "To apply for a loan, provide your details. Types: Business, Personal, MSME.";
  } else if (query.toLowerCase().includes("documents")) {
    return "Required documents: ID proof, address proof, bank statements.";
  } else if (query.toLowerCase().includes("status")) {
    return "Your application status is Pending. Expected timeline: 3-5 days.";
  } else if (query.toLowerCase().includes("human") || query.toLowerCase().includes("agent")) {
    return "Escalating to a human agent. Creating ticket...";
  } else {
    return "Sorry, I don't understand. Can you rephrase?";
  }
}