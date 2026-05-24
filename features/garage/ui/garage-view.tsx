import CarFormModal from './car-form-modal'
import GarageActions from './garage-actions'
import GarageHeader from './garage-header'
import GaragePagination from './garage-pagination'
import RaceControls from './race-controls'
import RaceTrack from './race-track'
import WinnerBanner from './winner-banner'

const GarageView = (): React.ReactElement => (
    <section className="flex flex-col gap-6">
        <GarageHeader />
        <RaceControls />
        <GarageActions />
        <RaceTrack />
        <GaragePagination />
        <CarFormModal />
        <WinnerBanner />
    </section>
)

export default GarageView
