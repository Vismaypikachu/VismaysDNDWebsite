import React from "react";

import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const ChakraNextLink = React.forwardRef(({ href, children, ...props }, ref) => {
    return (
        <NextLink href={href} passHref>
            <Link ref={ref} {...props}>
                {children}
            </Link>
        </NextLink>
    );
});

export default ChakraNextLink;
