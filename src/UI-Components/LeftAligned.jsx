function LeftAligned({leanmass,fat,carb,protien,calories,wt,wtUnit,gndr}) {
    return (
        <div className="w-[600px]">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Weight {wt} <b> {wtUnit}</b>, Gender {gndr}</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Lean Mass</dt>
              <dd className="mt-1 text-[18px] leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{leanmass}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Fat g</dt>
              <dd className="mt-1 text-[18px] leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{fat}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Carb g</dt>
              <dd className="mt-1 text-[18px] leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{carb}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Protien g</dt>
              <dd className="mt-1 text-[18px] leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{protien}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Total Calories</dt>
              <dd className="mt-1 text-[18px] leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{calories} </dd>
            </div>
            
          </dl>
        </div>
      </div>
      
    )
}

export default LeftAligned
