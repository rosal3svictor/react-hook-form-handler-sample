import { FormContent } from './components'
import { DemoFormContextProvider } from './providers'

/**
 * React component representing a demo form.
 *
 * @example
 * ```tsx
 * import { DemoForm } from './path/to/DemoForm';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <h1>My App</h1>
 *       <DemoForm />
 *     </div>
 *   );
 * };
 * ```
 */
export const DemoForm: React.FC = () => (
  <DemoFormContextProvider>
    <FormContent debugMode />
  </DemoFormContextProvider>
)
