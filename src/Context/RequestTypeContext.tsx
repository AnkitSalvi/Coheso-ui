import React, { createContext, useState, useContext } from "react";

export interface RequestType {
  id: string;
  requestType: string;
  purpose: string;
  informationToCollect: Array<{
    label: string;
    type: string;
    required: boolean;
  }>;
  requestTypeOwner: string;
  createdAt: string;
}

interface RequestTypeContextType {
  requestTypes: RequestType[];
  addRequestType: (newRequestType: RequestType) => void;
  updateRequestType: (updatedRequestType: RequestType) => void;
  deleteRequestType: (id: string) => void;
}

const RequestTypeContext = createContext<RequestTypeContextType | undefined>(
  undefined
);

export const RequestTypeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);

  const addRequestType = (newRequestType: RequestType) => {
    setRequestTypes([...requestTypes, newRequestType]);
  };

  const updateRequestType = (updatedRequestType: RequestType) => {
    setRequestTypes(
      requestTypes.map((type) =>
        type.id === updatedRequestType.id ? updatedRequestType : type
      )
    );
  };

  const deleteRequestType = (id: string) => {
    setRequestTypes(requestTypes.filter((type) => type.id !== id));
  };

  return (
    <RequestTypeContext.Provider
      value={{
        requestTypes,
        addRequestType,
        updateRequestType,
        deleteRequestType,
      }}
    >
      {children}
    </RequestTypeContext.Provider>
  );
};

export const useRequestTypeContext = () => {
  const context = useContext(RequestTypeContext);
  if (!context) {
    throw new Error(
      "useRequestTypeContext must be used within a RequestTypeProvider"
    );
  }
  return context;
};
