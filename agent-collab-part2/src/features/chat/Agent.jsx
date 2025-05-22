import { Flex } from '@radix-ui/themes'
import AgentList from '@/features/chat/AgentList'

function Agent() {
    return (
      <Flex
        direction='row'
        gap='4'
        width='100%'
        height='100%'
        p='1'>
        <AgentList />
      </Flex>
    )
  }

  export default Agent