function StatusDisplay({ status }: { status: string }) {
  if (!status) return null

  const getStatusColor = () => {
    if (status === 'ZWROT') return 'border-red-500 bg-red-900/50'
    if (status.includes('3.0')) return 'border-green-500 bg-green-900/50'
    return 'border-yellow-500 bg-yellow-900/50'
  }

  const getStatusIcon = () => {
    if (status === 'ZWROT') return '❌'
    if (status.includes('3.0')) return '✅'
    return '⏳'
  }

  return (
    <div className={`rounded-lg p-4 border ${getStatusColor()}`}>
      <div className="text-center">
        <div className="text-3xl mb-2">{getStatusIcon()}</div>
        <h3 className="font-bold text-lg mb-1">
          {status === 'ZWROT' ? 'ZWROT' :
            status.includes('3.0') ? 'ACCEPTED' : 'EXAMINATION...'}
        </h3>
        {status.includes('3.0') && (
          <p className="text-green-300 text-xl font-bold">Grade: 3.0</p>
        )}
        {status === 'ZWROT' && (
          <p className="text-red-300 text-sm">
            https://db.zmitac.aei.polsl.pl/GD/sprawozdania/
          </p>
        )}
      </div>
    </div>
  )
}

export default StatusDisplay
