import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TwitterAuthProvider, User, getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const LoginPage = () => {
    const [user, setUser] = useState<User>();
    const [receiverAddress, setReceiverAddress] = useState<string>("");

    // WAGMI
    const contractAddress = "0xcc62E6AcA6c73d739AFEF260BEF10Ed8FdC7641A";
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        args: [receiverAddress],
        abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_twitterHandle","type":"string"}],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getTwitterHandle","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_twitterHandle","type":"string"}],"name":"setTwitterHandle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"twitterHandles","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"twitterHandlesReverse","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
        functionName: 'setTwitterHandle',
    })
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    
    async function authWithTwitter() {
        const provider = new TwitterAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const secret = credential?.secret;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                setUser(user);
                setReceiverAddress((user as any).reloadUserInfo.screenName);
                console.log({ credential, token, secret, user });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = TwitterAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, email, credential });
                // ...
            });
    }

    return (
        <div>

            {/* auth with twitter */}
            {user && <div>
                <h1>Logged in as {user.displayName}</h1>
                <img src={user.photoURL ?? ""} alt={user.displayName ?? "aaa"} />
                <br />
                <input type="text" disabled value={(user as any).reloadUserInfo.screenName} placeholder="receiver address" onChange={(e) => setReceiverAddress(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1.5rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <br />
                <ConnectButton />
                <br />
                <button disabled={!write || isLoading} onClick={() => write?.()}>
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
                {isSuccess && (
                    <div>
                        Successfully saved your address
                        <div>
                            <a href={`https://basescan.org/tx/${data?.hash}`}>BaseScan</a>
                        </div>
                    </div>
                )}

            </div>

            }
            {!user && <button
                onClick={authWithTwitter}
            >Twitter</button>}
        </div>
    );
}

export default LoginPage;