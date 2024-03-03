import styled from '@emotion/styled'

/**
 * Represents a styled container for text elements.
 *
 * This component applies custom styles to the text elements inside it
 * (h3 and p tags).
 */
export const TextContainer = styled.div`
  & > h3 {
    margin: 10px auto;
  }

  & > p {
    margin: 0.5rem auto;
  }
`
