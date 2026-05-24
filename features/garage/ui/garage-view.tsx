import CarFormModal from './car-form-modal'
import GarageActions from './garage-actions'
import GarageHeader from './garage-header'
import RaceControls from './race-controls'
import RaceTrack from './race-track'

const GarageView = (): React.ReactElement => (
    <section className="flex flex-col gap-6">
        <GarageHeader />
        <RaceControls />
        <GarageActions />
        <RaceTrack />
        <CarFormModal />
    </section>
)

export default GarageView
