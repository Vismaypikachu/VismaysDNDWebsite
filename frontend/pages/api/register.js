import admin from "@lib/admin";
import axios from "axios";
import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed!" });
        return;
    }

    try {
        const db = admin.firestore();

        const body = req.body;

        if (typeof body.classId !== "string") {
            res.status(400).send({ message: "Invalid classId!" });
            return;
        }

        if (body.unregister && typeof body.unregister !== "boolean") {
            res.status(400).send({ message: "Invalid unregister!" });
            return;
        }

        const classDoc = await db.collection("classes").doc(body.classId).get();

        if (!classDoc.exists) {
            res.status(404).send({ message: "Class not found!" });
            return;
        }

        // if (!validateBody(body)) {
        //     res.status(400).end();
        //     return;
        // }

        const idToken = req.headers["authorization"]?.split(" ")[1];
        if (!idToken) {
            res.status(401).send({ message: "Need Authorization header!" });
            return;
        }

        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(idToken);
        } catch (e) {
            res.status(401).end();
            return;
        }

        const doc = await db.collection("users").doc(decodedToken.uid).get();
        if (!doc.exists) {
            res.status(403).end();
            return;
        }

        const registrationId = `${decodedToken.uid}_${body.classId}`;

        const registrationDoc = await db
            .collection("registrations")
            .doc(registrationId)
            .get();

        const pendingRegistrationDoc = await db
            .collection("registrations_pending")
            .doc(registrationId)
            .get();

        if (body.unregister) {
            if (!registrationDoc.exists && !pendingRegistrationDoc.exists) {
                res.status(400).send({ message: "Not registered!" });
                return;
            }

            if (registrationDoc.exists)
                await db
                    .collection("registrations")
                    .doc(registrationId)
                    .delete();
            if (pendingRegistrationDoc.exists)
                await db
                    .collection("registrations_pending")
                    .doc(registrationId)
                    .delete();

            res.status(200).send({ message: "Unregistered!" });
        } else {
            if (registrationDoc.exists) {
                res.status(400).send({ message: "Already registered!" });
                return;
            }

            const pendingRegistrationDoc = await db
                .collection("registrations_pending")
                .doc(registrationId)
                .get();

            if (pendingRegistrationDoc.exists) {
                res.status(400).send({ message: "Already registered!" });
                return;
            }

            await pendingRegistrationDoc.ref.set({
                classId: body.classId,
                studentId: decodedToken.uid,
                createdAt: admin.firestore.Timestamp.now(),
            });

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const userData = doc.data();
            const classData = classDoc.data();

            const msg = {
                to: ["admin@techsavvyyouth.org", "raymonzhang20@gmail.com"],
                from: "admin@techsavvyyouth.org",
                subject: `New registration for ${classData.title}`,
                text: `${userData.displayName} (${userData.email}) has registered for ${classData.title}`,
                html: `<p>${userData.displayName} (${userData.email}) has registered for ${classData.title}</p>`,
            };

            await sgMail.send(msg);

            res.status(200).send({ message: "Registration sent!" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
}
