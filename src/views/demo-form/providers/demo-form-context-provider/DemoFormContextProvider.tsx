import { useDemoForm } from '../../hooks'

import { DemoFormContext } from '.'

const DemoFormContextProvider: React.FC<{ children: React.ReactElement }> = ({
  children
}) => {
  const { contextValue } = useDemoForm()

  return (
    <DemoFormContext.Provider value={contextValue}>
      {children}
    </DemoFormContext.Provider>
  )
}

export default DemoFormContextProvider
