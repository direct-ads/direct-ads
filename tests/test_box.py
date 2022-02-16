def test_box(box, owner):
    box.store(42, sender=owner)

    value = box.retrieve()
    assert value == 42
