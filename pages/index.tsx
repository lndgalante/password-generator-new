import Head from 'next/head';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useClipboard } from '@chakra-ui/react';
import { Range, getTrackBackground } from 'react-range';

/*
  Project dependencies:
  - Next.js
  - Tailwind CSS
  - Heroicons
  - React Range
  - chakra-ui (solo para el useClipbloard)

  TODO:
  - Mobile responsive
  - Add states for StrengthPassword component
  - Add logic for password generation (check crypto web api)
  - Review por Hugo, Goncy, Tucu
*/

type SliderProps = {
  label: string;
  step: number;
  min: number;
  max: number;
  value: number;
  onChange: (values: number[]) => void;
};

function Slider({ label, step, min, max, value, onChange }: SliderProps) {
  return (
    <div className='space-y-6 group pb-4'>
      <div className='flex flex-row justify-between'>
        <span className='text-gray-100/40 group-hover:text-gray-100 transition'>{label}</span>
        <span className='text-green-100/40 group-hover:text-green-100 transition text-3xl'>{value}</span>
      </div>
      <Range
        step={step}
        min={min}
        max={max}
        values={[value]}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div className='h-2'>
            <div
              ref={props.ref}
              style={{
                background: getTrackBackground({
                  values: [value],
                  colors: ['#A4FFAF', '#18171F'],
                  min,
                  max,
                }),
              }}
              className='w-full h-2 '
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '28px',
              width: '28px',
              borderRadius: '100%',
            }}
            className='bg-gray-100 group-hover:bg-gray-400 group-hover:border-green-100 group-hover:border-2 transition'
          />
        )}
      />
    </div>
  );
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  // handlers
  function handleChange() {
    onChange(!checked);
  }

  return (
    <label className='flex flex-row items-center space-x-4 cursor-pointer select-none'>
      <input type='checkbox' className='accent-green-100 w-5 h-5' checked={checked} onChange={handleChange} />
      <span>{label}</span>
    </label>
  );
}

function PasswordStrength() {
  return (
    <div className='bg-gray-400 flex justify-between px-7 py-5'>
      <span className='uppercase text-gray-200'>Strength</span>
      <div className='flex flex-row space-x-4'>
        <span className='text-2xl'>MEDIUM</span>
        <div className='flex space-x-2'>
          <div className='h-7 w-[10px] bg-yellow-100'></div>
          <div className='h-7 w-[10px] bg-yellow-100'></div>
          <div className='h-7 w-[10px] bg-yellow-100'></div>
          <div className='h-7 w-[10px] border-2 border-gray-100'></div>
        </div>
      </div>
    </div>
  );
}

type IconProps = {
  className?: string;
};

function ArrowRight({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`w-6 h-6 ${className ?? ''}`}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
    </svg>
  );
}

function Duplicate() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
      />
    </svg>
  );
}

const Home: NextPage = () => {
  // react hooks
  const [characterLength, setCharacterLength] = useState<number>(10);
  const [shouldIncludeUpperCaseLetters, setShouldIncludeUpperCaseLetters] = useState<boolean>(false);
  const [shouldIncludeLowercaseLetters, setShouldIncludeLowercaseLetters] = useState<boolean>(false);
  const [shouldIncludeNumbers, setShouldIncludeNumbers] = useState<boolean>(false);
  const [shouldIncludeSymbols, setShouldIncludeSymbols] = useState<boolean>(false);

  // constants
  const password = 'PTx1f5DaFX';

  // react-use hooks
  const { hasCopied, onCopy } = useClipboard(password);

  // handlers
  function handleSliderChange(values: number[]) {
    setCharacterLength(values[0]);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Generated by create next app' />
      </Head>

      <main className='min-h-screen bg-gray-400 text-gray-100  text-lg font-["JetBrains_Mono"] flex items-center justify-center'>
        <div className='space-y-6  max-w-lg w-full'>
          <h1 className='text-center text-gray-200 text-2xl'>Password Generator</h1>

          <div className='bg-gray-300 px-8 py-6 flex flex-row justify-between items-center'>
            <span className='text-3xl'>{password}</span>
            <button
              onClick={onCopy}
              className={`flex space-x-2 p-2 h-11 transition-all ease-in-out ${hasCopied ? 'text-green-100' : ''}`}
            >
              <span className={`${hasCopied ? 'opacity-100' : 'opacity-0'} transition ease-in-out uppercase`}>
                Copied
              </span>
              <Duplicate />
            </button>
          </div>

          <div className='bg-gray-300 p-8 space-y-8'>
            <Slider
              label='Character Length'
              step={1}
              value={characterLength}
              min={1}
              max={20}
              onChange={handleSliderChange}
            />

            <div className='space-y-3 pl-[1px]'>
              <Checkbox
                label='Include Uppercase Letters'
                checked={shouldIncludeUpperCaseLetters}
                onChange={setShouldIncludeUpperCaseLetters}
              />
              <Checkbox
                label='Include Lowercase Letters'
                checked={shouldIncludeLowercaseLetters}
                onChange={setShouldIncludeLowercaseLetters}
              />
              <Checkbox label='Include Numbers' checked={shouldIncludeNumbers} onChange={setShouldIncludeNumbers} />
              <Checkbox label='Include Symbols' checked={shouldIncludeSymbols} onChange={setShouldIncludeSymbols} />
            </div>

            <PasswordStrength />

            <button className='group transition ease-in-out text-gray-400 w-full bg-green-100 hover:bg-opacity-0 hover:text-green-100 border-green-100 border-2 focus:ring-4 focus:ring-green-100 py-5 focus:outline-none uppercase'>
              <div className='flex justify-center items-center space-x-2'>
                <span>Generate</span>
                <ArrowRight className='w-4 h-4 mb-[1px] ' />
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
