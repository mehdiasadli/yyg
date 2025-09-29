'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { PlaneTakeoff, TreePalm, ShoppingBag, Building } from 'lucide-react';
import useDebounce from '@/hooks/use-debounce';

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}

interface SearchResult {
  actions: Action[];
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  item: {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.1 },
    },
  },
} as const;

const allActionsSample = [
  {
    id: '1',
    label: 'Dubai Airport',
    icon: <PlaneTakeoff className='h-4 w-4 text-blue-500' />,
    description: 'Al Garhoud',
    end: '12km',
  },
  {
    id: '2',
    label: 'JBR',
    icon: <TreePalm className='h-4 w-4 text-orange-500' />,
    description: 'Dubai Marina',
    end: '16km',
  },
  {
    id: '3',
    label: 'Dubai Mall',
    icon: <ShoppingBag className='h-4 w-4 text-purple-500' />,
    description: 'Downtown',
    end: '2km',
  },
  {
    id: '4',
    label: 'Business Bay',
    icon: <Building className='h-4 w-4 text-green-500' />,
    description: 'Dubai',
    end: '5km',
  },
];

interface ActionSearchBarProps {
  actions?: Action[];
  defaultOpen?: boolean;
  onSelect?: (action: Action) => void;
  query: string;
  setQuery: (query: string) => void;
}

function ActionSearchBar({
  actions = allActionsSample,
  defaultOpen = false,
  onSelect,
  query,
  setQuery,
}: ActionSearchBarProps) {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isFocused, setIsFocused] = useState(defaultOpen);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);

  const filteredActions = useMemo(() => {
    if (!debouncedQuery) return actions;

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    return actions.filter((action) => {
      const searchableText = `${action.label} ${action.description || ''}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [debouncedQuery, actions]);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      setActiveIndex(-1);
      return;
    }

    setResult({ actions: filteredActions });
    setActiveIndex(-1);
  }, [filteredActions, isFocused]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!result?.actions.length) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < result.actions.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : result.actions.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && result.actions[activeIndex]) {
            setSelectedAction(result.actions[activeIndex]);
          }
          break;
        case 'Escape':
          setIsFocused(false);
          setActiveIndex(-1);
          break;
      }
    },
    [result?.actions, activeIndex]
  );

  const handleActionClick = useCallback((action: Action) => {
    setSelectedAction(action);
    setIsFocused(false);
    setActiveIndex(-1);
    setQuery(action.label);
  }, []);

  const handleFocus = useCallback(() => {
    setSelectedAction(null);
    setIsFocused(true);
    setActiveIndex(-1);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
      setActiveIndex(-1);
    }, 200);
  }, []);

  return (
    <div className='relative z-10'>
      <Input
        type='text'
        placeholder='Where to?'
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        role='combobox'
        aria-expanded={isFocused && !!result}
        aria-autocomplete='list'
        aria-activedescendant={activeIndex >= 0 ? `action-${result?.actions[activeIndex]?.id}` : undefined}
        id='search'
        autoComplete='off'
        className='outline-none border-none bg-transparent rounded-full py-3 px-4 text-sm w-full transition-all duration-200 placeholder:text-gray-500 text-gray-900 font-light focus:outline-none focus:ring-0'
      />

      <AnimatePresence>
        {isFocused && result && !selectedAction && (
          <motion.div
            className='absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border border-gray-100/50 rounded-2xl shadow-2xl overflow-hidden mt-2 z-[9999]'
            variants={ANIMATION_VARIANTS.container}
            role='listbox'
            aria-label='Search results'
            initial='hidden'
            animate='show'
            exit='exit'
          >
            <motion.ul role='none' className='p-2'>
              {result.actions.map((action) => (
                <motion.li
                  key={action.id}
                  id={`action-${action.id}`}
                  className={`px-4 py-3 flex items-center justify-between hover:bg-gray-100/80 cursor-pointer rounded-xl transition-colors duration-200 ${
                    activeIndex === result.actions.indexOf(action) ? 'bg-gray-100/80' : ''
                  }`}
                  variants={ANIMATION_VARIANTS.item}
                  layout
                  onClick={() => handleActionClick(action)}
                  role='option'
                  aria-selected={activeIndex === result.actions.indexOf(action)}
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100/80'>
                      <span className='text-gray-600' aria-hidden='true'>
                        {action.icon}
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-900'>{action.label}</span>
                      {action.description && (
                        <span className='text-xs text-gray-500 font-light'>{action.description}</span>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {action.short && (
                      <span
                        className='text-xs text-gray-400 font-light'
                        aria-label={`Keyboard shortcut: ${action.short}`}
                      >
                        {action.short}
                      </span>
                    )}
                    {action.end && <span className='text-xs text-gray-400 font-light'>{action.end}</span>}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionSearchBar;
