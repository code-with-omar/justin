return (
  <div className="parentWrapper">
    {/* Show loader during search submission */}
    {isSearching ? (
      <div>
        <div className="">
          {title}
          {formComponent}
          <div className="flex items-center pt-3 gap-2 md:mt-6 w-64 justify-between mx-auto sm:w-[400px]">
            {buttonPrimary}
            {buttonSecondary}
          </div>
          <Loader />
        </div>
      </div>
    ) : (step === "2" || step === "3") && searchResults && !initialAdvance ? (
      <div className="w-full">
        <div className="flex justify-between items-center pl-7"></div>
        <div>
          {!isLoading && !isSearchResultsFetching && resultCard == "1" && (
            <SearchResults
              className="h-[calc(100vh-22rem)]"
              isFetching={isLoading}
              isSearching={isSearching}
              imageQueries={imageQueries}
              data={searchResults}
              onColorClick={onColorClick}
              searchQuery={searchTerms}
              setResultsLoading={setResultsLoader}
              setSearchTerms={setSearchTerms}
              setShowInitialSearch={setShowInitialSearch}
              recipeData={recipeData}
              searchBy={searchBy}
              resultsLoader={resultsLoader}
              form={formComponent}
              title={title}
              buttonPrimary={buttonPrimary}
              buttonSecondary={buttonSecondary}
            />
          )}
          {isRecipeLoading || isRecipeFetching || resultsLoader ? (
            <Loader />
          ) : (
            !isRecipeError &&
            resultCard === "2" && (
              <ConfirmColor
                selectedColor={selectedColor}
                onRecipeClick={onRecipeClick}
                getColorImage={getColorImage}
                recipeData={recipeData}
                imageQueries={imageQueries}
                getUndercoatImg={getUndercoatImg}
              />
            )
          )}
        </div>
      </div>
    ) : initialAdvance ? (
      <div className="w-full">
        {/* <button className="btn" onClick={handlePreviousStep}>
            back
          </button> */}
        {advanceStep <= 3 && advancedHeader}
        {advanceStep === 1 && <SelectBrand />}
        {advanceStep === 2 && <SelectModel />}
        {advanceStep === 3 && (
          <ColorsType setAdvanceSearch={setAdvSearchResults} />
        )}
        {advanceStep === 4 &&
          (step === "2" || step === "3") &&
          searchResults && (
            <div className="absolute w-full">
              <div className="flex justify-between items-center pl-7"></div>
              <div>
                {!isLoading &&
                  !isSearchResultsFetching &&
                  resultCard === "1" && (
                    <SearchResults
                      className="h-[calc(100vh-22rem)]"
                      isFetching={isLoading}
                      imageQueries={imageQueries}
                      data={advSearchResults}
                      onColorClick={onColorClick}
                      searchQuery={searchTerms}
                      setResultsLoading={setResultsLoader}
                      setSearchTerms={setSearchTerms}
                      setShowInitialSearch={setShowInitialSearch}
                      recipeData={recipeData}
                      searchBy={searchBy}
                      resultsLoader={resultsLoader}
                      form={formComponent}
                      title={title}
                      buttonPrimary={buttonPrimary}
                      buttonSecondary={buttonSecondary}
                    />
                  )}
                {isRecipeLoading || isRecipeFetching || resultsLoader ? (
                  <Loader />
                ) : (
                  !isRecipeError &&
                  resultCard === "2" && (
                    <ConfirmColor
                      selectedColor={selectedColor}
                      onRecipeClick={onRecipeClick}
                      getColorImage={getColorImage}
                      recipeData={recipeData}
                      imageQueries={imageQueries}
                      getUndercoatImg={getUndercoatImg}
                    />
                  )
                )}
              </div>
            </div>
          )}
      </div>
    ) : (
      <div className="flex items-center justify-center pt-[18%] md:pt-[10%]">
        <div className="flex flex-col justify-center items-center pt-3 gap-y-2 md:mt-6 mx-auto sm:w-[400px]">
          <img className="w-56" src={Logo} alt="Logo" />
          {title}
          {formComponent}
          <div className="flex items-center pt-3 gap-5 md:mt-6 w-full justify-between">
            {buttonPrimary}
            {buttonSecondary}
          </div>
        </div>
      </div>
    )}
  </div>
);
