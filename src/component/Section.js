import React from "react";
function Description(props) {
  const { h2, descriptions } = props;
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {h2}
          </h2>
          <ol>
            {descriptions.map((description) => (
              <li class="mb-4">{description}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Description;
