

export default function NegPosNumber({ number }: { number: number }) {
    
    
    return (
        <p>
            {number > 0 && (
                <span className="text-red-600">+{number}</span>
            )}
            {number < 0 && (
                <span className="text-green-600">{number}</span>
            )}
            {number === 0 && (
                <span className="text-gray-500">{number}</span>
            )}
        </p>
    )
}