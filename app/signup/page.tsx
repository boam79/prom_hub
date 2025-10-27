import Link from 'next/link'
import SignupForm from '@/components/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            계정 만들기
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              기존 계정으로 로그인
            </Link>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

