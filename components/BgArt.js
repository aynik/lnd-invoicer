import React from 'react'

export default (props) => (
  <svg width='1em' height='1em' viewBox='0 0 96 96' {...props}>
    <style jsx>{`
      svg {
        position: absolute;
        left: 55%;
        top: -40px;
        height: 420px;
        width: 420px;
      }
    `}</style>
    <defs>
      <linearGradient
        id='logo_3d_svg__a'
        gradientUnits='userSpaceOnUse'
        x1={61.26}
        y1={4.11}
        x2={50.58}
        y2={37.83}
      >
        <stop offset={0} stopColor='#3447F5' />
        <stop offset={1} stopColor='#001DA2' />
      </linearGradient>
      <linearGradient
        id='logo_3d_svg__b'
        gradientUnits='userSpaceOnUse'
        x1={66.42}
        y1={55.593}
        x2={23.353}
        y2={74.078}
      >
        <stop offset={0} stopColor='#3648F5' />
        <stop offset={1} stopColor='#001FBB' />
      </linearGradient>
      <linearGradient
        id='logo_3d_svg__c'
        gradientUnits='userSpaceOnUse'
        x1={22.188}
        y1={56.481}
        x2={42.373}
        y2={56.481}
      >
        <stop offset={0} stopColor='#3749F5' />
        <stop offset={1} stopColor='#001FBB' />
      </linearGradient>
      <linearGradient
        id='logo_3d_svg__d'
        gradientUnits='userSpaceOnUse'
        x1={32.106}
        y1={56.143}
        x2={75.334}
        y2={56.143}
        gradientTransform='matrix(1 -.176 -.176 1 0 0)'
      >
        <stop offset={0} stopColor='#374DFF' />
        <stop offset={0.5} stopColor='#001BFF' />
        <stop offset={0.998} stopColor='#0016CE' />
      </linearGradient>
    </defs>
    <path
      d='M65.562 1.501L66.6 6.6 52.4 39.2l-7.161 1.238L65.562 1.501z'
      fill='url(#logo_3d_svg__a)'
    />
    <path
      d='M65.797 37.812l1.878 5.963s.556.981-.663 2.606C65.939 47.812 27.2 91.8 27.2 91.8l-5.229.059s38.733-45.062 42.982-50.375c.224-.279.344-.608.366-.655.9-1.891.478-3.017.478-3.017z'
      fill='url(#logo_3d_svg__b)'
    />
    <path
      d='M22.188 56.219s3.656 2.593 4.624 3.093c1.464.756 2.844.532 4.469.376.129-.013 8.844-1.563 8.844-1.563l2.248-5.007c-19.935 3.07-20.185 3.101-20.185 3.101z'
      fill='url(#logo_3d_svg__c)'
    />
    <path
      d='M65.266 37.297c-.297-.172-.797-.281-1.526-.213l-18.313 3.229L65.578 1.781l-.016-.28C22.717 51.686 23.938 50.062 22.583 51.866c-1.279 1.702-1.082 3.23-1.065 3.267.188 1.02 1.081 1.562 2.229 1.402l18.313-3.229-20.089 38.553.685-.484c39.45-46.009 41.8-49.074 42.267-49.727.213-.263.409-.537.584-.819a4.757 4.757 0 0 0 .57-1.626s.214-1.312-.811-1.906z'
      fill='url(#logo_3d_svg__d)'
    />
  </svg>
)

