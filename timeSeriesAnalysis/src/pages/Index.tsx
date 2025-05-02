import WelcomeScreen from "../components/WelcomeScreen";

interface IndexProps {
  onGetStarted: () => void;
}

const Index = ({ onGetStarted }: IndexProps) => {
  return <WelcomeScreen onGetStarted={onGetStarted} />;
};

export default Index;
