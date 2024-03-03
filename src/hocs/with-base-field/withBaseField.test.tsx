import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { withBaseField } from './withBaseField'

// Create a mock form handler
const mockFormHandler = {
    setFormValue: vi.fn(),
    formState: vi.fn().mockReturnValue({
        currentState: {}
    }),
    fieldState: vi.fn().mockReturnValue({
        invalid: false,
        error: ''
    })
}

// Create a mock WrappedComponent
const MockComponent: React.FC<any> = (props) => (
    <div>
        <input
            data-testid="mock-input"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
        />
    </div>
)

const EnhancedComponent = withBaseField(MockComponent)

describe('withBaseField', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('Should render the enhanced component', () => {
        render(
            <EnhancedComponent formhandler={mockFormHandler} name="fieldName" />
        )

        const inputElement = screen.getByTestId('mock-input')
        expect(inputElement).toBeInTheDocument()
    })
})
