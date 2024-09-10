import CalendarSection from '../_components/CalendarSection'
import BehaviorSection from '../_components/BehaviorSection'
/* import DailyChart from '@/components/charts/DailyChart'

import { transformBehaviorsToStatistics } from '@/lib/utils' */
import { getAllBehaviorInstancesComplete, getAllBehaviors } from '@/lib/data'

import './page.css'

const Cycle = async (): Promise<React.ReactNode> => {
  const behaviors = await getAllBehaviorInstancesComplete()
  const behaviorOptions = await getAllBehaviors()

  /* const statistics = transformBehaviorsToStatistics(behaviors) */

  return (
    <div className="flex flex-col px-4 md:flex-row">
      <div className="h-[0_0_70%] flex justify-center items-center md:flex-col md:justify-start">
        <CalendarSection />
      </div>
      <div className="h-[0_0_30%] ">
        <BehaviorSection behaviors={behaviors} behaviorOptions={behaviorOptions} />
      </div>
      {/* {statistics !== undefined && <DailyChart data={sampleData} />} */}
    </div>
  )
}

export default Cycle
