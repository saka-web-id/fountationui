import { ref } from 'vue';

export function useMultiStepForm() {
    // --- Reactive state ---
    const currentStep = ref(0);
    const stepsCount = ref(0);

    // DOM elements
    const fieldsets = ref<HTMLElement[]>([]);
    const progressItems = ref<HTMLElement[]>([]);

    // --- Initialize DOM references ---
    const init = () => {
        fieldsets.value = Array.from(document.querySelectorAll('fieldset'));
        progressItems.value = Array.from(document.querySelectorAll('#progressMSForm li'));
        stepsCount.value = fieldsets.value.length;

        showStep(currentStep.value);
    };

    // --- Show a specific step ---
    const showStep = (index: number) => {
        fieldsets.value.forEach((fs, i) => {
            fs.style.display = i === index ? 'block' : 'none';
            fs.style.opacity = i === index ? '1' : '0';
        });

        // Update progress bar
        progressItems.value.forEach((li, i) => {
            li.classList.toggle('active', i <= index);
        });
    };

    // --- Navigate ---
    const next = () => {
        if (currentStep.value < stepsCount.value - 1) {
            currentStep.value++;
            showStep(currentStep.value);
        }
    };

    const previous = () => {
        if (currentStep.value > 0) {
            currentStep.value--;
            showStep(currentStep.value);
        }
    };

    // --- Optional: select a radio in a group ---
    const selectRadio = (group: HTMLElement, selected: HTMLElement) => {
        group.querySelectorAll('.radio').forEach(el => el.classList.remove('selected'));
        selected.classList.add('selected');
    };

    return {
        currentStep,
        stepsCount,
        next,
        previous,
        init,
        selectRadio,
    };
}