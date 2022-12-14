import Head from 'next/head';
import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { useClipboard } from '@chakra-ui/react';
import { Range, getTrackBackground } from 'react-range';
import generatePassword from 'generate-password';
import { passwordStrength } from 'check-password-strength';

/*
  Project dependencies:
  - Next.js
  - Tailwind CSS
  - Framer Motion
  - Otras libs: Heroicons, React Range, generate-password

  TODO:
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
    <div className='pb-4 space-y-6 group'>
      <div className='flex flex-row justify-between'>
        <span className='transition text-gray-100/40 group-hover:text-gray-100'>{label}</span>
        <span className='text-2xl transition md:text-3xl text-green-100/40 group-hover:text-green-100'>{value}</span>
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
            className='transition bg-gray-100 group-hover:bg-gray-400 group-hover:border-green-100 group-hover:border-2'
          />
        )}
      />
    </div>
  );
}

type CheckboxProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (param: { [key: string]: boolean }) => void;
};

function Checkbox({ name, label, checked, onChange }: CheckboxProps) {
  // handlers
  function handleChange() {
    onChange({ [name]: !checked });
  }

  return (
    <label className='flex flex-row items-center space-x-4 cursor-pointer select-none'>
      <input
        type='checkbox'
        name={name}
        className='w-5 h-5 accent-green-100'
        checked={checked}
        onChange={handleChange}
      />
      <span>{label}</span>
    </label>
  );
}

function TooWeak() {
  return (
    <Fragment>
      <div className='h-7 w-[10px] bg-red-100'></div>
      <div className='h-7 w-[10px] border-2 border-gray-100'></div>
      <div className='h-7 w-[10px] border-2 border-gray-100'></div>
      <div className='h-7 w-[10px] border-2 border-gray-100'></div>
    </Fragment>
  );
}

function Weak() {
  return (
    <Fragment>
      <div className='h-7 w-[10px] bg-orange-100'></div>
      <div className='h-7 w-[10px] bg-orange-100'></div>
      <div className='h-7 w-[10px] border-2 border-gray-100'></div>
      <div className='h-7 w-[10px] border-2 border-gray-100'></div>
    </Fragment>
  );
}

function Medium() {
  return (
    <Fragment>
      <div className='h-7 w-[10px] bg-yellow-100'></div>
      <div className='h-7 w-[10px] bg-yellow-100'></div>
      <div className='h-7 w-[10px] bg-yellow-100'></div>
      <div className='h-7 w-[10px] border-2 border-gray-100'></div>
    </Fragment>
  );
}

function Strong() {
  return (
    <Fragment>
      <div className='h-7 w-[10px] bg-green-100'></div>
      <div className='h-7 w-[10px] bg-green-100'></div>
      <div className='h-7 w-[10px] bg-green-100'></div>
      <div className='h-7 w-[10px] bg-green-100'></div>
    </Fragment>
  );
}

type Props = {
  label: string;
};

function PasswordStrength({ label }: Props) {
  return (
    <div className='flex justify-between py-5 bg-gray-400 px-7'>
      <span className='text-gray-200 uppercase'>Strength</span>
      <div className='flex flex-row space-x-4'>
        <span className='text-lg md:text-2xl'>{label}</span>
        <div className='flex space-x-2'>
          {label === 'Too weak' ? <TooWeak /> : null}
          {label === 'Weak' ? <Weak /> : null}
          {label === 'Medium' ? <Medium /> : null}
          {label === 'Strong' ? <Strong /> : null}
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

function Duplicate({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`w-6 h-6 ${className ?? ''}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
      />
    </svg>
  );
}

export async function getStaticProps() {
  const initialCharacterLength = 10;

  const initialPassword = generatePassword.generate({
    length: initialCharacterLength,
    numbers: true,
  });

  const { value: initialStrength } = passwordStrength(initialPassword);

  return {
    props: { initialCharacterLength, initialPassword, initialStrength },
  };
}

type PageProps = {
  initialCharacterLength: number;
  initialPassword: string;
  initialStrength: string;
};

const Home: NextPage<PageProps> = ({ initialCharacterLength, initialPassword, initialStrength }) => {
  // react hooks
  const [password, setPassword] = useState(initialPassword);
  const [strength, setStrength] = useState(initialStrength);
  const [options, setOptions] = useState({
    numbers: true,
    symbols: false,
    uppercase: false,
    lowercase: false,
    length: initialCharacterLength,
  });

  // react-use hooks
  const { hasCopied, onCopy } = useClipboard(password);

  // handlers
  function handleSliderChange(values: number[]) {
    setOptions((previousOptions) => ({ ...previousOptions, length: values[0] }));
  }

  function handleChangeOption(option: { [key: string]: boolean }) {
    setOptions((previousOptions) => ({ ...previousOptions, ...option }));
  }

  function handleGeneratePassword() {
    const password = generatePassword.generate({ ...options });
    const { value } = passwordStrength(password);

    setPassword(password);
    setStrength(value);
  }

  // constant
  const copiedStatus = hasCopied ? 'copied' : 'not-copied';

  const { length, ...extraOptions } = options;
  const hasOptionsError = !Object.values(extraOptions).some(Boolean);

  return (
    <div>
      <Head>
        <title>Password Generator</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Generate strong password for your services' />
      </Head>

      <main className='min-h-screen bg-gray-400 text-gray-100 text-base md:text-lg font-["JetBrains_Mono"] flex items-center justify-center'>
        <div className='w-full max-w-lg space-y-6'>
          <h1 className='text-base text-center text-gray-200 md:text-2xl'>Password Generator</h1>

          <div className='flex flex-row items-center justify-between px-8 py-6 bg-gray-300'>
            <motion.span
              className='text-2xl md:text-3xl'
              key={password}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {password}
            </motion.span>
            <button
              onClick={onCopy}
              className={`flex space-x-2 p-2 h-11 transition-all ease-in-out ${hasCopied ? 'text-green-100' : ''}`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={copiedStatus}
                variants={{
                  copied: {
                    opacity: 1,
                  },
                }}
                className='text-green-100 uppercase'
              >
                Copied
              </motion.span>
              <Duplicate />
            </button>
          </div>

          <div className='p-8 space-y-8 bg-gray-300'>
            <Slider
              label='Character Length'
              step={1}
              value={options.length}
              min={1}
              max={20}
              onChange={handleSliderChange}
            />

            <div className='space-y-3 pl-[1px]'>
              <Checkbox
                name='uppercase'
                label='Include Uppercase Letters'
                checked={options.uppercase}
                onChange={handleChangeOption}
              />
              <Checkbox
                name='lowercase'
                label='Include Lowercase Letters'
                checked={options.lowercase}
                onChange={handleChangeOption}
              />
              <Checkbox
                name='numbers'
                label='Include Numbers'
                checked={options.numbers}
                onChange={handleChangeOption}
              />
              <Checkbox
                name='symbols'
                label='Include Symbols'
                checked={options.symbols}
                onChange={handleChangeOption}
              />
              <p className='h-5 text-sm text-red-500 uppercase'>
                {hasOptionsError ? 'Should include at least one option' : ''}
              </p>
            </div>

            <PasswordStrength label={strength} />

            <button
              disabled={hasOptionsError}
              onClick={handleGeneratePassword}
              className='flex items-center justify-center w-full py-5 space-x-2 text-gray-400 uppercase transition ease-in-out bg-green-100 border-2 border-green-100 disabled:cursor-not-allowed group hover:bg-opacity-0 hover:text-green-100 focus:ring-4 focus:ring-green-100 focus:outline-none'
            >
              <span>Generate</span>
              <ArrowRight className='w-4 h-4 mb-[1px] ' />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
