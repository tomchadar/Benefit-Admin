import { Flex, Text, useTheme } from "@aws-amplify/ui-react";

export function Footer() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center" padding={tokens.space.medium}>
      <Text style={{color: "white"}}>&copy; 2022 Benefit. All Rights Reserved.</Text>
    </Flex>
  );
}
