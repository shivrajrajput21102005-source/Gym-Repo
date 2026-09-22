import {
  useContext,
  createContext,
  useState,
  type SetStateAction,
  type ReactNode,
} from "react";
type PlanProp = {
  _id: string;
  name: string;
  offer: string;
  badge: string;
  price: number;
  monthly: number;
  yearly: number;
  features: string[];
};
type ContextProviderProp = {
  children: ReactNode;
};
type CheckoutContextProp = {
  selectedPlan: PlanProp | null;
  setSelectedPlan: React.Dispatch<SetStateAction<PlanProp | null>>;
};
const CheckoutContext = createContext<CheckoutContextProp | null>(null);
export const CheckOutProvider = ({ children }: ContextProviderProp) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanProp | null>(null);
  return (
    <CheckoutContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export function useCheckOut() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("auth must be prod");
  }
  return context;
}
