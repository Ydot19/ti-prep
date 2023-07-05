package data_structures

import "sync"

type Set[T comparable] interface {
	Add(item T) Set[T]
	Clear()
	Delete(item T) bool
	Has(item T) bool
	Items() []T
	Size() int
}

func NewSet[T comparable]() Set[T] {
	return &set[T]{
		mux: new(sync.RWMutex),
	}
}

type set[T comparable] struct {
	items map[T]bool
	mux   *sync.RWMutex
}

func (s *set[T]) Add(item T) Set[T] {
	s.mux.Lock()
	defer s.mux.Unlock()

	if s.items == nil {
		s.items = make(map[T]bool)
	}

	_, ok := s.items[item]
	if !ok {
		s.items[item] = true
	}

	return s
}

func (s *set[T]) Clear() {
	s.mux.Lock()
	defer s.mux.Unlock()
	s.items = make(map[T]bool)
}

func (s *set[T]) Delete(item T) bool {
	s.mux.Lock()
	defer s.mux.Unlock()
	_, ok := s.items[item]
	if ok {
		delete(s.items, item)
	}
	return ok
}

func (s *set[T]) Has(item T) bool {
	s.mux.RLock()
	defer s.mux.RUnlock()
	_, ok := s.items[item]
	return ok
}

func (s *set[T]) Items() []T {
	s.mux.RLock()
	defer s.mux.RUnlock()
	setItems := make([]T, len(s.items))
	idx := 0
	for key, _ := range s.items {
		setItems[idx] = key
		idx += 1
	}
	return setItems
}

func (s *set[T]) Size() int {
	s.mux.RLock()
	defer s.mux.RUnlock()
	return len(s.items)
}
