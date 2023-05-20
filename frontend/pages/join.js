import { Container, Text } from "@chakra-ui/react";

import ExternalLayout from "@layouts/ExternalLayout";
export default function Join() {
	return (
		<Container>
			<Text py={300}>
				Not Created Yet, please standby while we roll out updates in the
				next couple of weeks. ETA April 27th
			</Text>
		</Container>
	);
}

Join.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
