import { Image, useTheme, Flex } from '@aws-amplify/ui-react'

export function Header() {
  const { tokens } = useTheme()

  return (
    <Flex justifyContent="center" padding={tokens.space.zero}>
      <Image
        alt="logo"
        src="https://static.wixstatic.com/media/1b187a_b94be199bdbb4f8eacfcd0365746b561~mv2.png/v1/fill/w_230,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Benefit%20logo%20Old%20White.png"
        padding={tokens.space.relative}
      />
    </Flex>
  )
}
