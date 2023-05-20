import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { doc, onSnapshot } from "firebase/firestore";

import { auth, firestore } from "./firebase";

export function useUserData() {
    const [user, loading, error] = useAuthState(auth);
    const [docLoading, setDocLoading] = useState(true);
    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        if (loading || error) return;

        let unsubscribe;

        if (user) {
            const docRef = doc(firestore, "users", user.uid);
            unsubscribe = onSnapshot(docRef, (doc) => {
                const data = doc.data();
                if (data) {
                    setDocLoading(false);
                    setUserDoc(data);
                } else {
                    setDocLoading(false);
                    setUserDoc(null);
                }
            });
        } else {
            setDocLoading(false);
            setUserDoc(null);
        }

        return unsubscribe;
    }, [user, loading, error]);

    return { user, userDoc, loading: docLoading };
}
