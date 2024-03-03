import { useDemoFormContext } from '../../providers'

/**
 * Represents a component containing action buttons for the form.
 *
 * These buttons perform various actions like pre-populating the form, resetting
 * the form, and triggering form or field validation.
 *
 * @returns The JSX element representing the action buttons.
 */
const ActionButtons = () => {
  const { formHandler } = useDemoFormContext()

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        type="button"
        onClick={() => {
          formHandler.resetForm({
            name: 'Samuel',
            lastName: 'Rosales'
          })
        }}
      >
        Pre Populate Form
      </button>
      <button
        type="button"
        onClick={() => {
          formHandler.resetForm()
        }}
      >
        Reset Form
      </button>
      <button
        type="button"
        onClick={() => {
          void formHandler.triggerValidation()
        }}
      >
        Trigger Form Validation
      </button>
      <button
        type="button"
        onClick={() => {
          void formHandler.triggerValidation('name')
        }}
      >
        Trigger Field Validation
      </button>
    </div>
  )
}

export default ActionButtons
