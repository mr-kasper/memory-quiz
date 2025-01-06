import ClientWrapper from '../components/ClientWrapper';
import { TextProvider } from '../context/TextProvider';

export default function Home() {
  return (
    <main className="p-4 max-w-6xl mx-auto sm:min-h-screen flex flex-col">
      <h1 className="text-4xl text-center mb-3">Text Learner</h1>
      <TextProvider>
        <ClientWrapper />
      </TextProvider>
      <br />
      <p className="text-center">Copyright &copy; {' ' + new Date().getFullYear()}</p>
    </main>
  );
}
