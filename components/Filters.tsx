import React, {useEffect, useState} from 'react';
import {getGenres} from '../api';
import {FormattedGenre} from '../types/Genres';
import {useRouter} from 'next/router';
import {Magnetic} from './Magnetic/Magnetic';
import Select from 'react-select';

const customStyles = {
  control: provided => ({
    ...provided,
    backgroundColor: 'black',
    borderColor: '#FFF',
    color: '#ffffff',
    transition: 'border-color 0.3s ease',
    minWidth: '150px',
    borderRadius: 2,
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#CA8A04',
    },
    '&:focus': {
      borderColor: '#CA8A04',
      boxShadow: 'none',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#CA8A04' : '#1c1c1c',
    color: '#ffffff',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: '#3a3a3a',
    },
  }),
  singleValue: provided => ({
    ...provided,
    color: '#ffffff',
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#1c1c1c',
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: '#CA8A04',
  }),
};

type Filter = {
  label: string;
  value: any;
};

export const Filters = () => {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [voteAverage, setVoteAverage] = useState<Filter>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Filter>(null);
  const [allGenres, setAllGenres] = useState<FormattedGenre[]>([]);

  const sortByOptions = [
    {value: 'original_title.asc', label: 'Title Ascending'},
    {value: 'original_title.desc', label: 'Title Descending'},
    {value: 'popularity.desc', label: 'Popularity Descending'},
    {value: 'popularity.asc', label: 'Popularity Ascending'},
    {value: 'revenue.desc', label: 'Revenue Descending'},
    {value: 'revenue.asc', label: 'Revenue Ascending'},
    {value: 'primary_release_date.asc', label: 'Release Date Ascending'},
    {value: 'primary_release_date.desc', label: 'Release Date Descending'},
    {value: 'vote_average.asc', label: 'Vote Rating Ascending'},
    {value: 'vote_average.desc', label: 'Vote Rating Descending'},
    {value: 'vote_count.asc', label: 'Vote Count Ascending'},
    {value: 'vote_count.desc', label: 'Vote Count Descending'},
  ];

  const yearOptions = [
    ...Array.from({length: new Date().getFullYear() - 1900}, (_, i) => ({
      value: (new Date().getFullYear() - i).toString(),
      label: (new Date().getFullYear() - i).toString(),
    })),
  ];

  const voteOptions = [
    ...Array.from({length: 11}, (_, i) => ({
      value: i,
      label: i.toString(),
    })),
  ];

  const languageOptions = [
    {value: 'en-US', label: 'English'},
    {value: 'fr-FR', label: 'French'},
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const {genres} = await getGenres();
        const formattedGenres = genres.map(genre => ({
          value: genre.id,
          label: genre.name,
        }));
        setAllGenres(formattedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const queryStr = Object.entries(router.query)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');

    const params = new URLSearchParams(queryStr);

    const selectedGenresFromUrl = params.get('with_genres');
    if (selectedGenresFromUrl && allGenres.length > 0) {
      const selectedGenresArray = selectedGenresFromUrl.split(',');
      const selectedGenres = selectedGenresArray.map(genreId => {
        const genre = allGenres.find(g => g.value === +genreId);
        if (genre) {
          return {value: genre.value, label: genre.label};
        }
        return null;
      });
      setSelectedGenre(selectedGenres);
    }

    const sortByFromUrl = params.get('sort_by');
    if (sortByFromUrl) {
      const selectedSortBy = sortByOptions.find(
        option => option.value === sortByFromUrl,
      );
      setSortBy(selectedSortBy);
    }

    const selectedYearFromUrl = params.get('year');
    if (selectedYearFromUrl) {
      const selectedYear = yearOptions.find(
        option => option.value === selectedYearFromUrl,
      );
      setSelectedYear(selectedYear);
    }

    const voteAverageFromUrl = params.get('vote_average.lte');
    if (voteAverageFromUrl) {
      const selectedVoteAverage = voteOptions.find(
        option => option.value === parseInt(voteAverageFromUrl),
      );
      setVoteAverage(selectedVoteAverage);
    }

    const selectedLanguageFromUrl = params.get('language');
    if (selectedLanguageFromUrl) {
      const selectedLanguage = languageOptions.find(
        option => option.value === selectedLanguageFromUrl,
      );
      setSelectedLanguage(selectedLanguage);
    }
  }, [allGenres, router.query]);

  const updateURLParams = () => {
    const queryStr = Object.entries(router.query)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');

    const params = new URLSearchParams(queryStr);

    const selectedGenres = selectedGenre
      ? selectedGenre.map((genre: FormattedGenre) => genre.value).join(',')
      : null;
    if (selectedGenres) params.set('with_genres', selectedGenres);

    if (sortBy && sortBy.value) params.set('sort_by', sortBy.value);

    if (selectedYear && selectedYear.value)
      params.set('year', selectedYear.value);

    if (
      voteAverage &&
      voteAverage.value !== null &&
      voteAverage.value !== undefined
    ) {
      params.set('vote_average.lte', String(voteAverage.value));
    }

    if (selectedLanguage && selectedLanguage.value)
      params.set('language', selectedLanguage.value);

    router.push(`?${params.toString()}`, undefined);
  };

  const handleSearch = () => {
    updateURLParams();
  };

  const handleResetFilters = () => {
    setSelectedGenre(null);
    setSortBy(null);
    setSelectedYear(null);
    setVoteAverage(null);
    setSelectedLanguage(null);

    router.push('/advancedSearch');
  };

  const updateSelectedGenre = selectedGenres => {
    selectedGenres = selectedGenres.filter(Boolean);

    setSelectedGenre(selectedGenres);

    const queryStr = Object.entries(router.query)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');

    const params = new URLSearchParams(queryStr);

    if (selectedGenres.length > 0) {
      const selectedGenresIds = selectedGenres
        .map(genre => genre.value)
        .join(',');
      params.set('with_genres', selectedGenresIds);
    } else {
      params.delete('with_genres');
    }

    router.push(`?${params.toString()}`, undefined, {shallow: true});
  };

  return (
    <div className="relative z-50 grid xl:flex xl:flex-row lg:lg:flex-row md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-4 px-10 container items-center self-center w-full md:justify-center">
      <Select
        value={selectedGenre}
        onChange={updateSelectedGenre}
        options={allGenres}
        placeholder="Select Genre"
        styles={customStyles}
        isMulti
      />
      <Select
        value={sortBy}
        onChange={setSortBy}
        options={sortByOptions}
        placeholder="Sort By"
        styles={customStyles}
      />
      <Select
        value={selectedYear}
        onChange={setSelectedYear}
        options={yearOptions}
        placeholder="Select Year"
        styles={customStyles}
      />

      <Select
        value={voteAverage}
        onChange={setVoteAverage}
        options={voteOptions}
        placeholder="Vote Average"
        styles={customStyles}
      />

      <Select
        value={selectedLanguage}
        onChange={setSelectedLanguage}
        options={languageOptions}
        placeholder="Select Language"
        styles={customStyles}
      />
      <Magnetic>
        <div
          className="p-[4px] px-5 bg-neutral-500 text-nowrap rounded-sm cursor-pointer"
          onClick={handleResetFilters}>
          <p className="font-semibold text-lg text-center">Reset Filters</p>
        </div>
      </Magnetic>
      <Magnetic>
        <div
          className="p-[4px] px-5 bg-yellow-600 rounded-sm cursor-pointer"
          onClick={handleSearch}>
          <p className="font-semibold text-lg text-center">Search!</p>
        </div>
      </Magnetic>
    </div>
  );
};
