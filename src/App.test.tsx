import { render, screen } from '@testing-library/react'

import { App } from './App'

describe('App Component', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('Renders application title', () => {
        const titleElement = screen.getByText(/Form Handler Sample/i)
        expect(titleElement).toBeInTheDocument()
    })

    it('renders Vite logo link', () => {
        const viteLogoLink = screen.getByRole('link', { name: /Vite logo/i })
        expect(viteLogoLink).toBeInTheDocument()
        expect(viteLogoLink).toHaveAttribute('href', 'https://vitejs.dev')
    })

    it('Renders React logo link', () => {
        const reactLogoLink = screen.getByRole('link', { name: /React logo/i })
        expect(reactLogoLink).toBeInTheDocument()
        expect(reactLogoLink).toHaveAttribute('href', 'https://reactjs.org')
    })

    it('Renders DemoForm component', () => {
        const demoFormComponent = screen.getByTestId('form-container')
        expect(demoFormComponent).toBeInTheDocument()
    })
})
