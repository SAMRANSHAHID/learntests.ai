/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  VideoInfo,
  Question,
  TopicExplanation,
  MiniQuiz,
} from '../types/assessment';
import { DEFAULT_THRESHOLDS, getMasteryCategory } from '../utils/evaluator';

export { DEFAULT_THRESHOLDS, getMasteryCategory };

export const SAMPLE_VIDEOS: VideoInfo[] = [
  {
    id: 'python_oop_01',
    url: 'https://www.youtube.com/watch?v=JeznW_70ZVU',
    title: 'Python Object-Oriented Programming: Complete Masterclass',
    channel: 'Corey Schafer (Educational)',
    duration: '42:18',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    transcriptSegmentCount: 184,
    detectedTopics: [
      'Classes',
      'Objects',
      'Methods',
      'Constructors',
      'Inheritance',
      'Encapsulation',
    ],
    summary:
      'A comprehensive guide covering OOP principles in Python, detailing class definitions, instance instantiation, self parameter binding, __init__ constructor syntax, inheritance hierarchies, and variable encapsulation.',
  },
  {
    id: 'deep_learning_02',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    title: 'Neural Networks and Deep Learning: Visual Foundations',
    channel: '3Blue1Brown',
    duration: '19:13',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    transcriptSegmentCount: 112,
    detectedTopics: [
      'Neurons',
      'Activation Functions',
      'Weights & Biases',
      'Cost Function',
      'Backpropagation',
      'Gradient Descent',
    ],
    summary:
      'A visual breakdown of artificial neural networks, multilayer perceptrons, matrix transformations, activation curves (Sigmoid/ReLU), and optimizing parameters via gradient descent.',
  },
];

/**
 * Full pool of 20 unique, video-grounded questions.
 * Ensures 5, 10, 15, and 20 question tests never have duplicate IDs or missing items.
 */
export const MOCK_QUESTIONS_PYTHON: Question[] = [
  {
    id: 'q1',
    type: 'mcq',
    topic: 'Classes',
    sourceTimestamp: '02:15',
    question: 'In Python, what is the primary structural purpose of defining a class?',
    options: [
      'To directly allocate hardware memory buffers for data streams',
      'To serve as a blueprint or schema for creating instance objects',
      'To compile Python source code into C-level binaries',
      'To define global constants accessible across multiple packages',
    ],
    correctAnswer: 1,
    explanation:
      'A class is a user-defined blueprint or prototype from which individual objects (instances) are created with shared attributes and behaviors.',
  },
  {
    id: 'q2',
    type: 'mcq',
    topic: 'Constructors',
    sourceTimestamp: '06:40',
    question: 'What is the role of the __init__() method when a new instance is created in Python?',
    options: [
      'It deallocates the instance memory when garbage collection runs',
      'It overrides the global namespace for class variables',
      'It acts as an initializer to assign initial attributes upon object creation',
      'It imports standard library dependencies required by the module',
    ],
    correctAnswer: 2,
    explanation:
      'The __init__() method acts as the class constructor/initializer in Python. It is automatically called when a new instance is instantiated to set initial instance attributes.',
  },
  {
    id: 'q3',
    type: 'mcq',
    topic: 'Methods',
    sourceTimestamp: '11:18',
    question: 'Why must regular instance methods in Python include "self" as their first formal parameter?',
    options: [
      'To explicitly pass a reference to the specific instance invoking the method',
      'To prevent the method from executing in multi-threaded environments',
      'Because "self" is a reserved low-level Python keyword that speeds up compilation',
      'To enforce private visibility outside of the defined class body',
    ],
    correctAnswer: 0,
    explanation:
      'In Python, instance methods automatically receive the instance itself as the first argument upon invocation. By convention, this parameter is named "self".',
  },
  {
    id: 'q4',
    type: 'mcq',
    topic: 'Objects',
    sourceTimestamp: '15:22',
    question: 'What distinguishes an "instance variable" from a "class variable"?',
    options: [
      'Instance variables are immutable, whereas class variables are mutable',
      'Instance variables are unique to each object; class variables are shared across all instances',
      'Class variables cannot be modified after the class declaration ends',
      'Instance variables can only contain primitive numeric integers',
    ],
    correctAnswer: 1,
    explanation:
      'Class variables are shared by all instances of the class, whereas instance variables contain data unique to each specific instance.',
  },
  {
    id: 'q5',
    type: 'mcq',
    topic: 'Inheritance',
    sourceTimestamp: '21:05',
    question: 'Which built-in Python function allows a subclass to invoke methods from its parent class?',
    options: [
      'parent()',
      'base()',
      'super()',
      'inherit()',
    ],
    correctAnswer: 2,
    explanation:
      'The super() built-in function returns a proxy object that delegates method calls to a parent or sibling class in the inheritance hierarchy.',
  },
  {
    id: 'q6',
    type: 'mcq',
    topic: 'Encapsulation',
    sourceTimestamp: '27:40',
    question: 'How does Python indicate that an attribute is intended for internal/protected use within a class convention?',
    options: [
      'By declaring it using the "private" prefix keyword',
      'By prefixing the attribute name with a single leading underscore (_)',
      'By wrapping the variable in an immutable tuple',
      'By annotating the attribute with @encapsulate decorator',
    ],
    correctAnswer: 1,
    explanation:
      'Python does not have strict private access modifiers; by convention, a leading single underscore (_attribute) signifies that an attribute is intended for internal use.',
  },
  {
    id: 'q7',
    type: 'short_answer',
    topic: 'Classes',
    sourceTimestamp: '04:50',
    question: 'Explain the fundamental difference between a "class" and an "object" in Python Object-Oriented Programming.',
    sampleAnswer:
      'A class is a conceptual template or blueprint defining attributes and behaviors, whereas an object is a concrete, instantiated realization of that blueprint allocated and holding distinct state in memory.',
    keyConcepts: [
      'blueprint or template',
      'instance of a class',
      'allocated in memory',
      'state and behavior',
    ],
  },
  {
    id: 'q8',
    type: 'short_answer',
    topic: 'Constructors',
    sourceTimestamp: '08:15',
    question: 'What happens if a class does NOT define an explicit __init__() method, and you instantiate it?',
    sampleAnswer:
      'Python uses the default constructor inherited from object base class, creating an empty instance with no custom attributes initialized.',
    keyConcepts: [
      'default constructor',
      'inherited from object',
      'no custom attributes set',
    ],
  },
  {
    id: 'q9',
    type: 'short_answer',
    topic: 'Inheritance',
    sourceTimestamp: '23:30',
    question: 'Describe how method overriding works when a subclass defines a method with the exact same name as its parent class.',
    sampleAnswer:
      'The subclass implementation overrides the parent method. When called on a subclass instance, Python resolves to the child method first according to the Method Resolution Order (MRO).',
    keyConcepts: [
      'subclass overrides parent',
      'Method Resolution Order',
      'child implementation takes precedence',
    ],
  },
  {
    id: 'q10',
    type: 'mcq',
    topic: 'Encapsulation',
    sourceTimestamp: '31:10',
    question: 'What occurs behind the scenes when an attribute is prefixed with double underscores, such as "__balance"?',
    options: [
      'Python encrypts the variable value with SHA-256 in memory',
      'Python performs name mangling, transforming the name to "_ClassName__balance"',
      'Python throws an AttributeError immediately if accessed anywhere',
      'Python makes the variable strictly read-only and deletes its setter',
    ],
    correctAnswer: 1,
    explanation:
      'Double leading underscores trigger Python name mangling, which rewrites the attribute internally to _ClassName__attribute to avoid accidental name collisions in subclasses.',
  },
  {
    id: 'q11',
    type: 'mcq',
    topic: 'Classes',
    sourceTimestamp: '03:40',
    question: 'Which statement accurately describes what happens in memory when `class Car:` is executed?',
    options: [
      'Python creates an executable class object in memory that can be inspected and instantiated',
      'Python compiles the script into machine code and clears all local variables',
      'Python opens a SQLite database table representing the class',
      'Python pauses CPU execution until an instance is explicitly declared',
    ],
    correctAnswer: 0,
    explanation:
      'In Python, classes are themselves first-class objects created in memory upon script execution.',
  },
  {
    id: 'q12',
    type: 'mcq',
    topic: 'Objects',
    sourceTimestamp: '17:05',
    question: 'If `emp_1 = Employee()` and `emp_2 = Employee()`, what is evaluated by `emp_1 is emp_2`?',
    options: [
      'True, because both are created from the same class blueprint',
      'False, because each variable references a distinct object memory address',
      'SyntaxError, because objects cannot be compared using "is"',
      'None, because Python requires an explicit __is__() method',
    ],
    correctAnswer: 1,
    explanation:
      'The "is" keyword compares object identity (memory location). emp_1 and emp_2 are distinct instances, so "is" evaluates to False.',
  },
  {
    id: 'q13',
    type: 'mcq',
    topic: 'Methods',
    sourceTimestamp: '13:50',
    question: 'What is the key functional difference between a `@classmethod` and a `@staticmethod` in Python?',
    options: [
      '@classmethod receives the class object (cls) as its first argument; @staticmethod receives neither self nor cls',
      '@staticmethod can modify private class variables; @classmethod cannot',
      '@classmethod can only be called from inside __init__; @staticmethod is global',
      'There is no difference; they are exact aliases of each other',
    ],
    correctAnswer: 0,
    explanation:
      '@classmethod automatically passes the class itself as `cls`, while @staticmethod functions like a normal function isolated within the class namespace.',
  },
  {
    id: 'q14',
    type: 'mcq',
    topic: 'Constructors',
    sourceTimestamp: '09:20',
    question: 'Can the `__init__()` method in Python have a `return` statement with an expression, like `return "Success"`?',
    options: [
      'Yes, it returns that value directly to the caller of the class instantiation',
      'No, returning any value other than None from __init__ raises a TypeError at runtime',
      'Yes, but only if the returned value is a boolean (True or False)',
      'Yes, but it prints a compiler warning to standard error',
    ],
    correctAnswer: 1,
    explanation:
      '__init__() is intended strictly to initialize instance state. Attempting to return any non-None value raises a TypeError.',
  },
  {
    id: 'q15',
    type: 'mcq',
    topic: 'Inheritance',
    sourceTimestamp: '24:45',
    question: 'What does the built-in `issubclass(Developer, Employee)` function return if `Developer` inherits from `Employee`?',
    options: [
      'True',
      'False',
      'A tuple containing both class objects',
      'An instance of Developer',
    ],
    correctAnswer: 0,
    explanation:
      'issubclass(sub, sup) returns True if sub is a subclass of sup (directly or indirectly).',
  },
  {
    id: 'q16',
    type: 'short_answer',
    topic: 'Encapsulation',
    sourceTimestamp: '29:50',
    question: 'Explain why getters and setters are implemented using the `@property` decorator in Python rather than Java-style get_attribute() functions.',
    sampleAnswer:
      'The @property decorator allows attributes to be accessed with clean dot notation while retaining behind-the-scenes encapsulation and validation without breaking backwards compatibility.',
    keyConcepts: [
      'dot notation syntax',
      'getter and setter',
      'validation logic',
      'backwards compatibility',
    ],
  },
  {
    id: 'q17',
    type: 'short_answer',
    topic: 'Methods',
    sourceTimestamp: '14:10',
    question: 'How do you create an alternative constructor in Python using the `@classmethod` decorator?',
    sampleAnswer:
      'By defining a class method that takes cls as its first parameter, parsing input arguments (such as a string or file), and returning cls(*parsed_args) to instantiate a new object.',
    keyConcepts: [
      'classmethod decorator',
      'receives cls parameter',
      'returns new instance cls()',
      'parses input format',
    ],
  },
  {
    id: 'q18',
    type: 'mcq',
    topic: 'Objects',
    sourceTimestamp: '18:30',
    question: 'What is the purpose of the built-in `isinstance(object, classinfo)` function?',
    options: [
      'To verify whether an object is an instance of a specified class or its subclasses',
      'To delete all references to an object from memory',
      'To clone an object deeply into a new memory location',
      'To convert an object into JSON string format',
    ],
    correctAnswer: 0,
    explanation:
      'isinstance() checks whether an object is an instance of the specified class or any subclass derived from it.',
  },
  {
    id: 'q19',
    type: 'mcq',
    topic: 'Constructors',
    sourceTimestamp: '10:05',
    question: 'How can default arguments be provided to a constructor so attributes have fallback values?',
    options: [
      'By declaring default parameter values in the signature: `def __init__(self, amount=0):`',
      'By placing a .default configuration file in the project directory',
      'By calling `python.set_default_constructor()`',
      'Constructors in Python cannot accept optional arguments',
    ],
    correctAnswer: 0,
    explanation:
      'Python standard function default parameters (e.g., amount=0) allow flexible constructor signatures.',
  },
  {
    id: 'q20',
    type: 'mcq',
    topic: 'Inheritance',
    sourceTimestamp: '26:15',
    question: 'In multiple inheritance (`class C(A, B)`), which algorithm resolves the order in which methods are inherited?',
    options: [
      'C3 Linearization (Method Resolution Order / MRO)',
      'First-Come First-Served FIFO Queue',
      'Lexicographical Alphabetical Sorting',
      'Random Hash Bucket Allocation',
    ],
    correctAnswer: 0,
    explanation:
      'Python uses C3 Linearization to produce the Method Resolution Order (MRO), ensuring consistent hierarchy traversal without duplicate ancestor lookups.',
  },
];

export const MOCK_TOPIC_EXPLANATIONS: Record<string, TopicExplanation> = {
  Inheritance: {
    topic: 'Inheritance',
    simpleExplanation:
      'Inheritance allows a new class (subclass or child) to receive attributes and methods from an existing class (superclass or parent), enabling code reuse and hierarchical organization.',
    importantPoints: [
      'Child classes inherit all methods and properties from the parent class.',
      'Child classes can extend parent behavior by adding new methods.',
      'Child classes can override parent methods by defining a method with the same name.',
      'Use the super() function to call methods from the parent class without hardcoding the parent class name.',
    ],
    example: `class Animal:
    def speak(self):
        return "Generic sound"

class Dog(Animal):
    def speak(self):
        # Overriding parent method
        return "Bark!"`,
    commonMistake:
      'Forgetting to call super().__init__() inside a child class constructor, which leaves the parent class attributes uninitialized.',
    sourceTimestamp: '20:10 – 26:40',
    quickPracticeQuestion: {
      question: 'What will happen if a child class defines __init__ but never calls super().__init__()?',
      options: [
        'The program crashes with a SyntaxError immediately',
        'Parent class attributes initialized in its __init__ will not be set',
        'Python automatically executes the parent __init__ regardless',
        'The child class loses all its own methods',
      ],
      correctAnswer: 1,
      explanation:
        'When you override __init__ in a subclass, the parent constructor is suppressed unless explicitly invoked via super().__init__().',
    },
  },
  Constructors: {
    topic: 'Constructors',
    simpleExplanation:
      'In Python, the __init__ method is a special method called automatically whenever a new object is created from a class. It is used to initialize the object\'s initial state (its attributes).',
    importantPoints: [
      'The __init__ method is bounded by double underscores (dunder method).',
      'It always takes "self" as its first argument to bind values directly to the newly allocated instance.',
      'It should not return any value; its sole duty is state initialization.',
    ],
    example: `class Student:
    def __init__(self, name, major):
        self.name = name        # instance attribute
        self.major = major      # instance attribute

sam = Student("Samran", "Information Technology")`,
    commonMistake:
      'Trying to return a value from __init__() using return statement with an object, which raises a TypeError in Python.',
    sourceTimestamp: '06:40 – 10:15',
    quickPracticeQuestion: {
      question: 'What type must the return value of __init__() always be in Python?',
      options: [
        'An integer representing the memory address',
        'None (it must not return any value)',
        'A dictionary containing instance properties',
        'A boolean indicating successful initialization',
      ],
      correctAnswer: 1,
      explanation:
        '__init__() must return None. Attempting to return any non-None value raises a TypeError at runtime.',
    },
  },
  Encapsulation: {
    topic: 'Encapsulation',
    simpleExplanation:
      'Encapsulation bundles data (attributes) and methods that operate on that data into a single unit, while restricting direct outside access to internal details.',
    importantPoints: [
      'Python relies on naming conventions rather than strict language-level keywords like public or private.',
      'Single leading underscore (_variable) indicates "internal/protected" by convention.',
      'Double leading underscore (__variable) activates name mangling.',
      'Property decorators (@property and @setter) provide controlled getter and setter access.',
    ],
    example: `class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # protected convention

    @property
    def balance(self):
        return self._balance`,
    commonMistake:
      'Assuming double underscores (__var) provide cryptographic security; name mangling is meant to prevent accidental collisions in inheritance, not provide encryption.',
    sourceTimestamp: '27:40 – 33:20',
    quickPracticeQuestion: {
      question: 'What is the Pythonic way to expose a private attribute with custom validation?',
      options: [
        'Use global variable declarations',
        'Use @property and @setter decorators',
        'Disable class garbage collection',
        'Pass the attribute through a sys.argv parameter',
      ],
      correctAnswer: 1,
      explanation:
        'The @property decorator and matching setter method provide clean getter/setter syntax while preserving standard dot notation access.',
    },
  },
  Methods: {
    topic: 'Methods',
    simpleExplanation:
      'Methods are functions defined inside the body of a class that describe the behaviors and actions that instances of the class can perform.',
    importantPoints: [
      'Instance methods receive "self" pointing to the caller instance.',
      'Class methods use @classmethod and receive "cls" pointing to the class object.',
      'Static methods use @staticmethod and behave like plain functions without automatic self/cls binding.',
    ],
    example: `class Calculator:
    @staticmethod
    def add(a, b):
        return a + b`,
    commonMistake:
      'Calling an instance method from a class without passing an instance, or omitting self in the method signature.',
    sourceTimestamp: '11:18 – 15:00',
    quickPracticeQuestion: {
      question: 'Which decorator is used for a method that needs access to the class itself but not a specific instance?',
      options: [
        '@instancemethod',
        '@classmethod',
        '@staticproperty',
        '@classmethod_only',
      ],
      correctAnswer: 1,
      explanation:
        '@classmethod receives the class object (cls) as its first argument instead of an instance.',
    },
  },
  Objects: {
    topic: 'Objects',
    simpleExplanation:
      'An object is an individual instance of a class that possesses its own specific attribute values and can execute methods defined by its class blueprint.',
    importantPoints: [
      'Every object in Python has an identity (id()), a type, and a value.',
      'Objects are allocated on the heap in memory.',
      'Two distinct objects can have identical values but different identities.',
    ],
    example: `a = [1, 2]
b = [1, 2]
print(a == b)  # True (equal values)
print(a is b)  # False (different object identities)`,
    commonMistake:
      'Confusing the equality operator (==) with the identity operator (is).',
    sourceTimestamp: '15:22 – 19:40',
    quickPracticeQuestion: {
      question: 'What does the "is" keyword evaluate in Python?',
      options: [
        'Whether two variables hold identical values',
        'Whether two references point to the exact same object in memory',
        'Whether a class implements an interface',
        'Whether an object has been garbage collected',
      ],
      correctAnswer: 1,
      explanation:
        'The "is" keyword checks identity (whether id(a) == id(b)), whereas "==" checks equality of value.',
    },
  },
  Classes: {
    topic: 'Classes',
    simpleExplanation:
      'A class acts as an extensible program-code-template for creating objects, providing initial values for state and implementations of behavior.',
    importantPoints: [
      'Classes are created using the `class` keyword.',
      'Class names traditionally follow PascalCase (CamelCase) convention.',
      'In Python 3, all classes implicitly inherit from the base `object` class.',
    ],
    example: `class MachineLearningModel:
    pass`,
    commonMistake:
      'Treating a class definition as the executable data structure rather than instantiating instances from it.',
    sourceTimestamp: '02:15 – 06:10',
    quickPracticeQuestion: {
      question: 'What is the base class of all new-style classes in Python 3?',
      options: [
        'type',
        'object',
        'base',
        'root',
      ],
      correctAnswer: 1,
      explanation:
        'In Python 3, all classes implicitly inherit from built-in object.',
    },
  },
};

export const MOCK_MINI_QUIZZES: Record<string, MiniQuiz> = {
  Inheritance: {
    topic: 'Inheritance',
    questions: [
      {
        id: 'mq_inh_1',
        question: 'Which built-in function checks whether an object is an instance of a specified class or its subclasses?',
        options: [
          'typeof()',
          'isinstance()',
          'issubclass()',
          'hasattr()',
        ],
        correctAnswer: 1,
        explanation: 'isinstance(obj, Class) returns True if obj is an instance of Class or any subclass derived from Class.',
        sourceTimestamp: '21:45',
      },
      {
        id: 'mq_inh_2',
        question: 'What algorithm does Python 3 use to resolve Method Resolution Order in multiple inheritance?',
        options: [
          'Breadth-First Search (BFS)',
          'C3 Linearization (MRO)',
          'Depth-First Search (DFS)',
          'Dijkstra\'s Shortest Path',
        ],
        correctAnswer: 1,
        explanation: 'Python uses the C3 Linearization algorithm to determine the consistent Method Resolution Order (MRO).',
        sourceTimestamp: '24:10',
      },
      {
        id: 'mq_inh_3',
        question: 'When super().method() is called inside a child class, what determines which method executes?',
        options: [
          'The order of files in the current folder',
          'The class\'s Method Resolution Order (MRO)',
          'The operating system thread priority',
          'The length of the method name',
        ],
        correctAnswer: 1,
        explanation: 'super() searches the next class in the current instance\'s MRO chain.',
        sourceTimestamp: '25:30',
      },
    ],
  },
  Constructors: {
    topic: 'Constructors',
    questions: [
      {
        id: 'mq_con_1',
        question: 'Which method is called first to allocate memory before __init__ initializes it?',
        options: [
          '__new__()',
          '__allocate__()',
          '__build__()',
          '__create__()',
        ],
        correctAnswer: 0,
        explanation: '__new__ is the actual constructor that creates and returns the instance, while __init__ initializes it.',
        sourceTimestamp: '07:15',
      },
      {
        id: 'mq_con_2',
        question: 'What happens if you define multiple __init__() methods in the same Python class?',
        options: [
          'Python creates overloaded constructors based on parameter count',
          'The last defined __init__() overrides all previous ones',
          'Python produces a compiler error during module parsing',
          'All __init__ methods run in sequence',
        ],
        correctAnswer: 1,
        explanation: 'Python does not support traditional method overloading by signature; the last defined method will overwrite earlier definitions.',
        sourceTimestamp: '09:00',
      },
      {
        id: 'mq_con_3',
        question: 'How do you pass optional arguments with defaults to __init__?',
        options: [
          'By defining multiple class headers',
          'By specifying default parameter values in the signature: def __init__(self, title="Default")',
          'By using C-style function pointers',
          'By calling sys.set_default_args()',
        ],
        correctAnswer: 1,
        explanation: 'Default argument syntax in def __init__(self, val=10) provides clean optional constructor parameters.',
        sourceTimestamp: '09:45',
      },
    ],
  },
  Encapsulation: {
    topic: 'Encapsulation',
    questions: [
      {
        id: 'mq_enc_1',
        question: 'What is the output when an external script attempts to access an instance attribute named __secret directly?',
        options: [
          'It returns None silently',
          'It raises an AttributeError because of name mangling',
          'It deletes the attribute permanently',
          'It prints a deprecation warning',
        ],
        correctAnswer: 1,
        explanation: 'Due to name mangling, __secret is renamed to _ClassName__secret, causing direct access obj.__secret to raise AttributeError.',
        sourceTimestamp: '29:10',
      },
      {
        id: 'mq_enc_2',
        question: 'Which syntax properly defines a setter for a property called "age"?',
        options: [
          '@age.setter',
          '@set_age',
          '@property.set',
          '@mutate.age',
        ],
        correctAnswer: 0,
        explanation: 'The @property_name.setter decorator specifies the setter method for an existing @property.',
        sourceTimestamp: '32:00',
      },
      {
        id: 'mq_enc_3',
        question: 'Why is encapsulation considered a core pillar of Object-Oriented software engineering?',
        options: [
          'It guarantees automatic multi-GPU acceleration',
          'It maintains class invariants and prevents external components from corrupting internal state',
          'It replaces relational databases with RAM structures',
          'It automatically converts code into machine language',
        ],
        correctAnswer: 1,
        explanation: 'Encapsulation safeguards internal state integrity and decouples implementation details from public interfaces.',
        sourceTimestamp: '33:15',
      },
    ],
  },
};
