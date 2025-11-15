import {ReactNode} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

type Props = {
    children: ReactNode,
}

const SignedIn = ({children}: Props) => {
    const [user] = useAuthState(auth);
    if (!user) {
        //return login page in future updates
        return null
    }
  return (

    <>{children}</>
  )
}

export default SignedIn