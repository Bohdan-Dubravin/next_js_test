import { getProviders, signIn } from "next-auth/react";
import { Header } from "../../components/Header";

export default function SignIn(props) {
  const providers = props.providers;
  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen justify-center py-2 mt-[-50px] text-center">
        <img
          src="https://links.papareact.com/ocw"
          alt="logo"
          className="w-60"
        />
        <p className="italic">For test purpose</p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-600 transition 1s ease-out"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
