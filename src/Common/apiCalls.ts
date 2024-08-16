import axios from "axios";

// const API_URL = "https://coheso-production.up.railway.app/api"; // Replace with your actual API URL

const API_URL = "http://localhost:5000/api";
export interface RequestTypeDetails {
  requestType: string;
  purpose: string;
  informationToCollect: InformationToCollect[];
  requestTypeOwner: string;
}

interface InformationToCollect {
  field: string;
  type: "text" | "long-text" | "date" | "select";
  required: boolean;
  example?: string;
  options?: string[];
}

export async function addRequestTypeForUser(
  userId: string,
  requestDetails: RequestTypeDetails
) {
  try {
    console.log("requestDetails:", requestDetails);
    const response = await axios.post(
      `${API_URL}/requestTypes`,
      {
        userId,
        requestDetails,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log("Request type created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding request type:", error);
    throw error; // Handle error appropriately
  }
}

export async function getRequestTypesForUser(userId: string) {
  try {
    const response = await axios.get(`${API_URL}/requestTypes/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    console.log("Request types retrieved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving request types:", error);
    throw error; // Handle error appropriately
  }
}

export async function updateRequestTypeForUser(
  userId: string,
  requestTypeId: string,
  updatedData: Partial<RequestTypeDetails>
) {
  try {
    const response = await axios.put(
      `${API_URL}/requestTypes/${userId}/${requestTypeId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log("Request type updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating request type:", error);
    throw error; // Handle error appropriately
  }
}

export async function deleteRequestTypeForUser(
  userId: string,
  requestTypeId: string
) {
  try {
    const response = await axios.delete(
      `${API_URL}/requestTypes/${userId}/${requestTypeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      }
    );

    console.log("Request type deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting request type:", error);
    throw error; // Handle error appropriately
  }
}

export async function loginUser(email: string, password: string) {
  try {
    console.log("Login attempt for:", email);
    const response = await axios.post(
      `${API_URL}/auth/login`, // Replace with your actual login endpoint
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login successful:", response.data);
    return response.data; // This typically includes the token or user details
  } catch (error) {
    console.error("Error logging in:", error);
    return false; // Handle error appropriately
  }
}
